export function getFieldState({ formState, fieldState }) {
    console.log("validate")
	return {
        
		error: formState.isSubmitted &&  !!fieldState.error,
		helperText:
			formState.isSubmitted &&
			
			fieldState.error?.message,
	};
}
