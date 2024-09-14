import { showMessage } from "react-native-flash-message";

export const handleApiError = (error: any) => {
    let errorMessage = 'Erro desconhecido, contato o administrador.';

    if (error.response) {
        errorMessage = error.response.data?.message;
    } else if (error.request) {
        errorMessage = 'Sistema fora do ar, verifique sua conexão.';
    } else {
        errorMessage = error.message || 'Erro ao configurar requsição.';
    }

    showMessage({
        message: errorMessage,
        type: 'danger',
        duration: 3000,
    });

    console.clear();
}