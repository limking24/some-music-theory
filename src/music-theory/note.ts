/**
 * Remove accidental from a note if it has any.
 * 
 * ```
 * Example:
 * C4  => C4
 * Fb4 => F4
 * A#3 => A3
 * ``` 
 */
export function removeAccidental(pitchNotation?: string): string | undefined {
	if (pitchNotation === undefined)
		return;
	
	return (pitchNotation.length === 2) ? 
				pitchNotation : 
				pitchNotation.charAt(0) + pitchNotation.charAt(2);
}