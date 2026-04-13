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
├── dataset/
│   ├── 📊 dados_cardiacos.csv         # 500 registros clínicos cardiovasculares
│   ├── 📊 mapa_conhecimento.csv       # 250 pares sintoma → doença cardiovascular
│   ├── 📊 frases_risco.csv            # 140 frases rotuladas (alto/baixo risco)
│   ├── 📄 sintomas_frases.txt         # 10 frases simulando relatos de pacientes
│   └── 📁 CardioIA_Dataset_Fase1.xlsx # Dataset estruturado da Fase 1
│
├── Parte 1/
│   ├── 🐍 diagnostico.py              # Código Python (versão script)
│   └── 📓 diagnostico_parte1.ipynb    # Jupyter Notebook com outputs gravados
│
└── Parte 2/
    └── 📓 classificador_parte2.ipynb  # Classificador TF-IDF + ML com avaliação
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

## ✅ Parte 2 – Classificador de Risco por Processamento de Linguagem Natural

### O que foi desenvolvido

Um classificador de texto supervisionado que analisa frases em linguagem natural relatadas por pacientes e prediz automaticamente o nível de risco cardiovascular como **alto risco** ou **baixo risco**. O sistema reproduz, com ferramentas acessíveis, a lógica por trás de sistemas reais de triagem clínica automatizada.

### Arquivos da Parte 2

| Arquivo | Descrição |
|---|---|
| `dataset/frases_risco.csv` | 140 frases simuladas em português, rotuladas como `alto risco` ou `baixo risco`, distribuídas em 7 categorias temáticas por classe |
| `Parte 2/classificador_parte2.ipynb` | Notebook completo com EDA, vetorização TF-IDF, treinamento, comparação de modelos, avaliação e seção de governança |

### Dataset simulado (`frases_risco.csv`)

O dataset foi criado para esta etapa pois os arquivos existentes da Fase 1 não eram adequados para classificação por frases: o `dados_cardiacos.csv` contém sintomas como palavras-chave curtas (não narrativas), e o `sintomas_frases.txt` possui apenas 10 exemplos — insuficiente para treinar um modelo de ML.

**140 frases balanceadas (70 por classe), organizadas em 7 categorias temáticas:**

| Alto Risco | Baixo Risco |
|---|---|
| Dor torácica com irradiação | Assintomático em consulta de rotina |
| Infarto agudo (sudorese + náusea) | Cansaço leve / estresse laboral |
| Dispneia grave em repouso | Dispneia de esforço controlada |
| Síncope e colapso | Palpitações benignas ocasionais |
| Crise hipertensiva | Pressão controlada por medicação |
| Arritmia sintomática grave | Dor muscular / extra-cardíaca |
| Edema pulmonar descompensado | Jovem com queixas vagas e exames normais |

### Metodologia

**1. Vetorização com TF-IDF**

As frases foram transformadas em vetores numéricos usando `TfidfVectorizer` do scikit-learn com os seguintes hiperparâmetros:

```python
TfidfVectorizer(
    max_features=200,      # limita vocabulário para evitar overfitting no dataset pequeno
    ngram_range=(1, 2),    # bigramas capturam expressões como "dor no peito"
    min_df=2,              # remove termos que aparecem em apenas 1 documento
    max_df=0.90,           # remove termos quase universais sem poder discriminativo
    sublinear_tf=True,     # aplica log(1+tf), adequado para frases curtas
    strip_accents='unicode' # normaliza acentuação portuguesa
)
```

**2. Divisão dos dados**

- Treino: 80% (112 frases) | Teste: 20% (28 frases)
- Estratificada por classe e com `random_state=42` para reprodutibilidade
- `fit_transform` aplicado apenas no treino para evitar *data leakage*

**3. Modelos treinados e comparados**

| Modelo | Acurácia | Recall (alto risco) |
|---|---|---|
| Decision Tree (`max_depth=5`) | 85,71% | 100,00% |
| **Logistic Regression** | **92,86%** | **92,86%** |

### Modelo escolhido: Logistic Regression

A **Regressão Logística** foi selecionada como modelo principal pelos seguintes motivos:

- **Melhor acurácia geral** (92,86% vs. 85,71% da Decision Tree)
- **Melhor generalização** em matrizes TF-IDF esparsas de alta dimensão, onde a Decision Tree tende ao overfitting
- **Interpretabilidade:** os coeficientes do modelo revelam diretamente quais termos mais contribuem para cada classe, permitindo auditoria e validação clínica
- **Regularização L2** nativa que penaliza complexidade excessiva no dataset de tamanho reduzido

> **Nota sobre o recall:** A Decision Tree atingiu 100% de recall para "alto risco" no conjunto de teste, porém com acurácia geral inferior — indicando overfitting. Em produção, prefere-se um modelo equilibrado como a Regressão Logística, que mantém recall alto (92,86%) com menor risco de generalização ruim.

### Como executar

**Dependências:** `pandas`, `scikit-learn`, `matplotlib`, `seaborn`

```bash
pip install pandas scikit-learn matplotlib seaborn jupyter
jupyter notebook "Parte 2/classificador_parte2.ipynb"
```

**No Google Colab (sem instalação):** faça upload do `.ipynb` e do `frases_risco.csv` e altere o caminho de leitura para `'frases_risco.csv'`.

---


## ⚖️ Governança de Dados e Viés em IA

Mesmo na Parte 1, já identificamos limitações importantes que devem ser consideradas por qualquer desenvolvedor de IA responsável:

- **Correspondência por substring:** o sistema atual busca termos exatos nas frases, o que pode gerar falsos positivos com palavras curtas presentes em contextos diferentes.
- **Vocabulário restrito:** frases com termos coloquiais ou regionais podem não ser reconhecidas pelo mapa de conhecimento.
- **Sintomas independentes:** o sistema não cruza múltiplos sintomas para refinar o diagnóstico — cada sintoma é avaliado isoladamente.
- **Ausência de dados demográficos:** idade, sexo e histórico familiar não são considerados nesta versão, o que pode introduzir viés na sugestão de diagnósticos.

---

## 👥 Equipe – Grupo 59

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

*CardioIA – Grupo 59 | FIAP 2026*
