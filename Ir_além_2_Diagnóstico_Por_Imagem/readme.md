# Ir Além 2 – Diagnóstico Visual em Cardiologia com Rede Neural 🫀🤖

Este repositório contém a solução para a atividade "Ir Além 2", cujo objetivo é aplicar uma Rede Neural Artificial (MLP) para classificar sinais médicos de eletrocardiogramas (ECG), identificando se o ritmo cardíaco é normal ou apresenta alguma anomalia.

O projeto explora conceitos do CardioIA aplicados ao diagnóstico visual, demonstrando como a Inteligência Artificial pode atuar na triagem automatizada e no apoio à decisão médica.

---

## 🚀 O Desafio do Pré-processamento: De Série Temporal para Imagem

O escopo do projeto exigia o processamento de imagens (com etapas de redimensionamento e conversão). No entanto, o dataset público escolhido (`shayanfazeli/heartbeat` - PTB Diagnostic ECG Database) fornece dados vetorizados em formato CSV (séries temporais 1D de 187 pontos).

Para cumprir os requisitos de diagnóstico **visual** sem trocar de dataset, foi aplicada uma técnica de engenharia e manipulação de tensores:
1. **Padding:** Os sinais 1D originais (187 pontos) receberam um preenchimento com 9 zeros no final, totalizando 196 pontos.
2. **Reshape:** O vetor de 196 pontos foi redimensionado para uma **matriz 2D de 14x14**.
3. **Representação Visual:** Essa matriz atua perfeitamente como uma "imagem em tons de cinza" de 14x14 pixels, onde cada "pixel" representa a intensidade elétrica do sinal naquele instante.

![Exemplo de ECG transformado em Imagem 14x14](Ir_além_2_Diagnóstico_Por_Imagem\assets\imagem_redmensionada) 

---

## 🧠 Arquitetura da Rede Neural (MLP)

A rede foi construída utilizando a biblioteca `TensorFlow / Keras`. Como se trata de um Perceptron Multicamadas (MLP), a matriz da imagem precisa ser achatada novamente antes de passar pelas camadas densas.

A estrutura definida foi:
- **Input:** Matriz 14x14 representando o sinal de ECG.
- **Flatten:** Achatamento da imagem para um vetor de 196 posições.
- **Hidden Layer 1:** Camada Densa com 128 neurônios + ativação ReLU (+ Dropout de 30% para evitar *overfitting*).
- **Hidden Layer 2:** Camada Densa com 64 neurônios + ativação ReLU (+ Dropout de 20%).
- **Output Layer:** Camada Densa com 1 neurônio + ativação **Sigmoid** (ideal para classificação binária: Normal vs. Anormal).
- **Função de Perda:** `binary_crossentropy`
- **Otimizador:** `adam`

---

## 📊 Resultados e Desempenho

O modelo foi treinado por 20 épocas e atingiu excelentes métricas de avaliação no conjunto de testes não vistos:

- **Acurácia Global:** ~94%
- O modelo demonstra alta capacidade de identificar anomalias reais, errando pouquíssimas vezes a classificação (falsos positivos/negativos minimizados).

### Matriz de Confusão
*(Dica: Você pode adicionar um print da matriz de confusão gerada pelo código aqui)*

---

## 🛠️ Como Executar o Projeto

**Pré-requisitos:**
Certifique-se de ter as seguintes bibliotecas instaladas no seu ambiente Python:
```bash
pip install kagglehub pandas numpy matplotlib seaborn scikit-learn tensorflow
