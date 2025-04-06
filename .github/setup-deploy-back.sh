#!/bin/bash

CHAVE_NAME="id_rsa_deploy_$(date +%Y%m%d%H%M%S)"
KEY_PATH="$HOME/.ssh/$CHAVE_NAME"
EC2_USER="ec2-user"
EC2_HOST="ec2-52-91-102-151.compute-1.amazonaws.com"
REPO_PATH="/home/ec2-user/spring-angular-contatos"

# === Verifica se a chave já existe ===
if [ -f "$KEY_PATH" ]; then
  echo "⚠️ Já existe uma chave com esse nome: $KEY_PATH"
  exit 1
fi

# === Gera chave SSH ===
ssh-keygen -t rsa -b 4096 -f $KEY_PATH -N ""
chmod 400 $KEY_PATH

echo -e "\n✅ Chave SSH gerada em: $KEY_PATH"

# === Copia chave pública para EC2 ===
echo -e "\n➡️ Adicionando chave pública à instância EC2"
ssh-copy-id -i $KEY_PATH.pub $EC2_USER@$EC2_HOST

# === Cria estrutura na EC2 se necessário ===
echo -e "\n📁 Criando pasta do projeto na EC2..."
ssh -i $KEY_PATH $EC2_USER@$EC2_HOST "mkdir -p $REPO_PATH && chmod 755 $REPO_PATH"

# === Saída final ===
echo -e "\n✅ Tudo pronto! Agora adicione essa chave PRIVADA no GitHub como Secret:"
echo "🔐 GitHub > Settings > Secrets > Actions"
echo "➡️ Nome do Secret: EC2_SSH_KEY"
echo -e "➡️ Conteúdo:\n"
cat $KEY_PATH
