# 🫀 CardioIA – Fase 2: Diagnóstico Assistido por IA

> Projeto acadêmico desenvolvido para a disciplina de **Inteligência Artificial aplicada à Saúde** – FIAP
> **Grupo 69**

---

## 📋 Sobre o Projeto

O **CardioIA** é um sistema modular de apoio ao diagnóstico cardiovascular baseado em Inteligência Artificial. Nesta segunda fase, o objetivo é simular a automatização do diagnóstico — prática amplamente utilizada em centros de diagnóstico modernos, onde algoritmos se tornam os *estetoscópios digitais do século XXI*.

O projeto aplica técnicas de **NLP (Processamento de Linguagem Natural)**, **classificação de texto** e **análise de vieses**, a partir do dataset cardiovascular construído na Fase 1, para desenvolver um módulo inteligente capaz de:

- 🔍 Interpretar relatos textuais de pacientes
- 🩺 Identificar sintomas automaticamente
- 📊 Sugerir diagnósticos com base em mapa de conhecimento clínico
- ⚖️ Refletir sobre governança de dados e viés em IA

---

## 📁 Estrutura do Repositório

```
CardioIA-Fase-2/
│
├── 📄 sintomas_frases.txt         # 10 frases simulando relatos de pacientes
├── 📊 mapa_conhecimento.csv       # 250 pares sintoma → doença cardiovascular
├── 🐍 diagnostico.py              # Código Python (versão script)
├── 📓 diagnostico_parte1.ipynb    # Jupyter Notebook com outputs gravados
│
└── [Em breve] parte2/             # Parte 2 – Modelo de Classificação ML
```

---

## ✅ Parte 1 – Extração de Sintomas e Diagnóstico Assistido

### O que foi desenvolvido

Um sistema de apoio ao diagnóstico que lê frases em linguagem natural relatadas por pacientes, identifica sintomas e sugere possíveis diagnósticos com base em um mapa de conhecimento clínico.

### Arquivos da Parte 1

| Arquivo | Descrição |
|---|---|
| `sintomas_frases.txt` | 10 frases completas simulando relatos de pacientes, com o que sentem, quando começou e como afeta a rotina |
| `mapa_conhecimento.csv` | 250 registros com estrutura `Sintoma1 \| Sintoma2 \| Doença Associada`, cobrindo 30+ condições cardiovasculares |
| `diagnostico_parte1.ipynb` | Notebook com código completo, outputs executados e seção de governança de dados |

### Doenças cobertas pelo mapa de conhecimento

O CSV abrange condições como: Infarto do Miocárdio, Insuficiência Cardíaca, Angina (Estável, Instável), Arritmia Cardíaca, Fibrilação Atrial, Hipertensão Arterial, AVC, Endocardite, Pericardite, Miocardite, Cardiomiopatias, Trombose Venosa Profunda, Embolia Pulmonar, Estenose/Insuficiência Aórtica e Mitral, Síndrome Metabólica, Doença de Chagas, Síndrome Coronariana Aguda, entre outras.

### Como executar

**Pré-requisitos:** Python 3.8+ (sem dependências externas — apenas bibliotecas padrão)

```bash
# Opção 1: script Python
python3 diagnostico.py

# Opção 2: Jupyter Notebook
jupyter notebook diagnostico_parte1.ipynb
```

### Exemplo de saída

```
============================================================
  CardioIA - Parte 1: Análise de Sintomas
============================================================
  Mapa de conhecimento: 250 entradas
  Frases carregadas   : 10
============================================================

Paciente 05: Tenho sentido um aperto no tórax que começa no meio do peito
             e se irradia para o braço esquerdo há quatro dias...
  -> 1 possível(is) diagnóstico(s):
     • Infarto do Miocárdio
       (Sintomas detectados: aperto no tórax)
```

---

## 🔜 Parte 2 – Modelo de Classificação com Machine Learning

> 🚧 **Em desenvolvimento**

Esta parte utilizará o dataset cardiovascular da Fase 1 (500 registros) para treinar um modelo de ML capaz de prever o risco do paciente com base em variáveis clínicas e frases curtas de sintomas.

**Tecnologias previstas:** scikit-learn, pandas, TF-IDF, classificadores supervisionados.

---


## ⚖️ Governança de Dados e Viés em IA

Mesmo na Parte 1, já identificamos limitações importantes que devem ser consideradas por qualquer desenvolvedor de IA responsável:

- **Correspondência por substring:** o sistema atual busca termos exatos nas frases, o que pode gerar falsos positivos com palavras curtas presentes em contextos diferentes.
- **Vocabulário restrito:** frases com termos coloquiais ou regionais podem não ser reconhecidas pelo mapa de conhecimento.
- **Sintomas independentes:** o sistema não cruza múltiplos sintomas para refinar o diagnóstico — cada sintoma é avaliado isoladamente.
- **Ausência de dados demográficos:** idade, sexo e histórico familiar não são considerados nesta versão, o que pode introduzir viés na sugestão de diagnósticos.

---

## 👥 Equipe – Grupo 69

| Nome | RM |
|---|---|
| Felipe Almeida | — |
| Vinícius Burchert Vilas Boas | — |
| Renan Wesler Nunes | — |

**Instituição:** FIAP – Faculdade de Informática e Administração Paulista
**Disciplina:** Inteligência Artificial aplicada à Saúde
**Fase:** 2 — *"Do Python à Fronteira Quântica"*

---

## 🔗 Referências

- Sociedade Brasileira de Cardiologia (SBC)
- American Heart Association (AHA)
- European Society of Cardiology (ESC)
- IBGE / VIGITEL – Vigilância de Fatores de Risco

---

*CardioIA – Grupo 69 | FIAP 2026*
