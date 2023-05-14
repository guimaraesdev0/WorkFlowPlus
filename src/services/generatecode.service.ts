//Gera os código 4-4 aleatorios para as salas do workstation
export function generateWorkstationInviteCode(): string {
    let code = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    for (let i = 0; i < 8; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
      if (i === 3) {
        code += '-';
      }
    }
    return code;
  }
  