import { Injectable } from '@angular/core';
import {
  fetchAuthSession,
  signIn,
  signUp,
  confirmSignUp,
  resetPassword,
  confirmResetPassword,
  fetchUserAttributes,
  signOut,
  getCurrentUser,
} from '@aws-amplify/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  async login(username: string, password: string) {
    try {
      await signOut();

      const response = await signIn({ username, password });

      const session = await fetchAuthSession();

      const accessToken = session.tokens?.accessToken?.toString();
      const idToken = session.tokens?.idToken?.toString();

      if (accessToken && idToken) {
        localStorage.setItem('token', accessToken);
        localStorage.setItem('idToken', idToken);
      }

      return { accessToken, idToken };
    } catch (error) {
      throw error;
    }
  }

  async signUp(email: string, password: string, name: string) {
    try {
      return await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
            name,
            picture: 'https://placehold.co/400',
          },
        },
      });
    } catch (error: any) {
      if (error.name === 'NotAuthorizedException') {
        throw new Error('Usuário ou senha incorretos.');
      }

      if (error.name === 'UserNotConfirmedException') {
        throw new Error(
          'Sua conta ainda não foi confirmada. Verifique seu e-mail.',
        );
      }

      if (error.name === 'UserNotFoundException') {
        throw new Error('Usuário não encontrado. Verifique o e-mail digitado.');
      }

      throw new Error(error.message || 'Erro ao criar conta. Tente novamente.');
    }
  }

  async confirmUser(email: string, code: string) {
    try {
      const result = await confirmSignUp({
        username: email,
        confirmationCode: code,
      });

      return result;
    } catch (error: any) {
      if (error.name === 'CodeMismatchException') {
        throw new Error('O código informado está incorreto.');
      }

      if (error.name === 'ExpiredCodeException') {
        throw new Error('O código expirou. Solicite um novo.');
      }

      if (error.name === 'UserNotFoundException') {
        throw new Error('Usuário não encontrado.');
      }

      if (error.name === 'NotAuthorizedException') {
        throw new Error('Essa conta já foi confirmada.');
      }

      throw new Error(
        error.message || 'Erro ao confirmar a conta. Tente novamente.',
      );
    }
  }

  async forgotPassword(username: string) {
    return resetPassword({ username });
  }

  async confirmNewPassword(
    username: string,
    code: string,
    newPassword: string,
  ) {
    try {
      await confirmResetPassword({
        username,
        confirmationCode: code,
        newPassword,
      });
    } catch (error: any) {
      if (error.name === 'CodeMismatchException') {
        throw new Error(
          'O código informado está incorreto. Verifique e tente novamente.',
        );
      }

      if (error.name === 'ExpiredCodeException') {
        throw new Error(
          'O código expirou. Solicite um novo código para redefinir a senha.',
        );
      }

      if (error.name === 'InvalidPasswordException') {
        throw new Error('A nova senha não atende aos requisitos de segurança.');
      }

      if (error.name === 'LimitExceededException') {
        throw new Error(
          'Muitas tentativas. Aguarde e tente novamente mais tarde.',
        );
      }

      if (error.name === 'UserNotFoundException') {
        throw new Error('Usuário não encontrado.');
      }

      throw new Error(error.message || 'Erro inesperado ao redefinir a senha.');
    }
  }

  async getUserInfo() {
    try {
      const attributes = await fetchUserAttributes();
      return {
        attributes,
      };
    } catch (error) {
      console.error('Erro ao buscar atributos do usuário:', error);
      throw error;
    }
  }

  async getSession() {
    return fetchAuthSession();
  }
}
