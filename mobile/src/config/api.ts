/**
 * Endereço base do backend.
 *
 * O celular/emulador não acessa "localhost" da mesma forma que o navegador
 * do computador — cada ambiente precisa de um endereço diferente:
 *
 * - Emulador Android: http://10.0.2.2:3000        (10.0.2.2 = "localhost" do seu PC)
 * - Simulador iOS:    http://localhost:3000
 * - Celular físico:   http://SEU_IP_NA_REDE:3000   (ex: http://192.168.0.10:3000)
 *
 * Troque o valor abaixo conforme onde você estiver testando o app.
 */
export const API_URL = 'http://10.0.2.2:3000';
