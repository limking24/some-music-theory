<template>
	<div class="scale-type-picker">
		<div>
			<label for="supertype">Type</label>
			<select id="supertype" v-model="supertype" @change="loadTypes(Number($event.target.value))" size="10">
				<option v-for="(supertype, key) in supertypes" :key="key" :value="key">
					{{supertype}}
				</option>
			</select>
		</div>
		<div>
			<label for="type">Scale</label>
			<select id="type" :value="scaleType" @change="$emit('picked', $event.target.value)" size="10">
				<option v-for="(type, key) in types" :key="key" :value="key" :class="{'alias-of-selected': type.aliasOfSelected}">
					{{type.display}}
				</option>
			</select>
		</div>
	</div>
</template>

<script lang="ts">
import { ScaleDao } from '@/data-access/scale-dao';
import { ScaleType as Dto } from '@/data/scale-type';
import { ScaleSupertype, ScaleType } from '@/models/scale-type-picker';
import { Inject } from 'typescript-ioc';
import { Optional } from 'typescript-optional';
import { Vue } from 'vue-class-component';
import { Prop, Watch } from 'vue-property-decorator';

export default class ScaleTypePicker extends Vue {

	@Prop({default: []})
	excludeSupertypes!: ScaleSupertype[];

	@Prop({default: ''})
	scaleType!: string;

	@Inject
	scaleDao!: ScaleDao;

	supertypes: Record<string, string> = {};

	types: Record<string, ScaleType> = {};

	supertype: number = -1;

	async mounted(): Promise<void> {
		// Find the scale type to be selected from database, and load supertypes options synchronously.
		let [scale] = await Promise.all([
			this.scaleType ? this.scaleDao.get(this.scaleType) : Promise.resolve(Optional.empty<Dto>()), 
			this.loadSuperTypes()
		]);
		// Check if the scale type exists, and if its supertype is one of the options.
		// If yes, then they will be the selected scale type and supertype.
		// Otherwise, set the supertype to the first option
		scale.ifPresent(data => {
			if (data.supertype in this.supertypes) {
				this.supertype = data.supertype;
			}
		});
		if (this.supertype === -1) {
			this.supertype = Number(Object.keys(this.supertypes)[0]);
		}
		// Load type options
		await this.loadTypes(this.supertype);
	}

	async loadSuperTypes(): Promise<void> {
		this.supertypes = (await this.scaleDao.supertypes())
							.filter(supertype => !this.excludeSupertypes.includes(supertype))
							.reduce((options, supertype) => {
								let display = `${ScaleSupertype[supertype]} (${supertype})`;
								if (display) {
									options[supertype] = display;
								}
								return options;
							}, {} as Record<string, string>);
	}

	async loadTypes(supertype: number): Promise<void> {
		// Load types
		this.types = (await this.scaleDao.getBySupertype(supertype))
						.reduce((options, type) => {
							options[type.key] = new ScaleType(type.display, type.aliasKeys);
							return options;
						}, {} as Record<string, ScaleType>);
		// Highlight aliases
		this.toggleAliasHighlight(this.scaleType);
		// Position the selected option (or the first option) to the top
		this.$nextTick(() => {
			let select = this.$el.querySelector('.scale-type-picker #type');
			let selected = this.$el.querySelector('.scale-type-picker #type option:checked') as HTMLElement;
			select.scrollTop = (selected) ? selected.offsetTop - select.offsetTop : 0;
		});
	}

	@Watch('scaleType')
	onTypeChanged(newType: string, oldType: string): void {
		this.toggleAliasHighlight(oldType);
		this.toggleAliasHighlight(newType);
	}

	toggleAliasHighlight(type: string): void {
		if (type in this.types) {
			for (let alias of this.types[type].aliasKeys) {
				if (alias in this.types) {
					this.types[alias].toggleAliasOfSelected();
				}
			}
		}
	}

}
</script>

<style scoped>
.scale-type-picker {
	white-space: nowrap;
	margin: 20px;
}

.scale-type-picker > div {
	display: inline-block;
	text-align: left;
}

label {
	margin: 0 13px;
	font-weight: bold;
	font-size: large;
}

select {
	display: block;
	margin: 0 12px;
	overflow-y: auto;
}

#supertype {
	width: 170px;
}

#type {
	width: 250px;
}

select:focus option:checked {
	background: rgb(45, 150, 250) linear-gradient(rgb(45, 150, 250), rgb(45, 150, 250));
}

#type:focus .alias-of-selected {
	color: rgb(255, 255, 255);
	background: rgb(100, 175, 255);
	transition: color 0.15s, background 0.5s ease-out;
}

#type:not(:focus) .alias-of-selected {
	background: rgb(225, 225, 225);
}
</style>