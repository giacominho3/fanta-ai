import { useCallback } from 'react';

export const useFileUpload = () => {
  const validateFile = useCallback((file) => {
    if (!file) return { valid: false, error: 'Nessun file selezionato' };
    
    if (!file.name.match(/\.(xlsx|xls)$/)) {
      return { 
        valid: false, 
        error: 'Formato file non supportato. Usa file Excel (.xlsx o .xls)' 
      };
    }
    
    return { valid: true };
  }, []);

  const handleFileUpload = useCallback(async (event, onValidFile, onError) => {
    const file = event.target.files[0];
    const validation = validateFile(file);
    
    if (!validation.valid) {
      onError?.(validation.error);
      return;
    }

    await onValidFile?.(file);
    event.target.value = '';
  }, [validateFile]);

  return {
    validateFile,
    handleFileUpload
  };
};