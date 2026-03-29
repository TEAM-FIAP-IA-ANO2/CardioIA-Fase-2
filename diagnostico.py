# =============================================================
# CardioIA - Fase 2 | Parte 1
# Extração de Sintomas e Sugestão de Diagnóstico
# =============================================================

import csv
import re

# -----------------------------------------------------------
# 1. Carregar o mapa de conhecimento (CSV)
# -----------------------------------------------------------
def carregar_mapa(caminho_csv='mapa_conhecimento.csv'):
    """
    Lê o arquivo CSV e retorna uma lista de dicionários com
    os campos: sintoma1, sintoma2, doenca_associada.
    """
    mapa = []
    with open(caminho_csv, encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for linha in reader:
            mapa.append({
                'sintoma1': linha['Sintoma1'].strip().lower(),
                'sintoma2': linha['Sintoma2'].strip().lower(),
                'doenca': linha['Doenca_Associada'].strip()
            })
    return mapa

# -----------------------------------------------------------
# 2. Carregar as frases de sintomas (TXT)
# -----------------------------------------------------------
def carregar_frases(caminho_txt='sintomas_frases.txt'):
    """
    Lê o arquivo TXT e retorna uma lista de frases limpas.
    """
    with open(caminho_txt, encoding='utf-8') as f:
        linhas = f.readlines()
    # Remove numeração inicial (ex: "1. ", "2. ") e espaços extras
    frases = []
    for linha in linhas:
        linha = linha.strip()
        if linha:
            # Remove numeração inicial
            linha = re.sub(r'^\d+\.\s*', '', linha)
            frases.append(linha)
    return frases

# -----------------------------------------------------------
# 3. Identificar sintomas na frase e sugerir diagnóstico
# -----------------------------------------------------------
def identificar_sintomas_e_diagnostico(frase, mapa):
    """
    Percorre o mapa de conhecimento e verifica se algum sintoma
    (sintoma1 ou sintoma2) está contido na frase.
    Retorna uma lista de (sintoma encontrado, doença associada).
    """
    frase_lower = frase.lower()
    resultados = []
    doencas_encontradas = set()

    for entrada in mapa:
        sintoma1 = entrada['sintoma1']
        sintoma2 = entrada['sintoma2']
        doenca   = entrada['doenca']

        achou_s1 = sintoma1 in frase_lower
        achou_s2 = sintoma2 in frase_lower

        if (achou_s1 or achou_s2) and doenca not in doencas_encontradas:
            sintomas_achados = []
            if achou_s1:
                sintomas_achados.append(sintoma1)
            if achou_s2:
                sintomas_achados.append(sintoma2)
            resultados.append({
                'sintomas_identificados': sintomas_achados,
                'diagnostico_sugerido': doenca
            })
            doencas_encontradas.add(doenca)

    return resultados

# -----------------------------------------------------------
# 4. Executar análise para todas as frases
# -----------------------------------------------------------
def analisar_frases(caminho_txt='sintomas_frases.txt',
                    caminho_csv='mapa_conhecimento.csv'):
    mapa   = carregar_mapa(caminho_csv)
    frases = carregar_frases(caminho_txt)

    print("=" * 60)
    print("  CardioIA - Parte 1: Análise de Sintomas")
    print("=" * 60)
    print(f"  Mapa de conhecimento: {len(mapa)} entradas")
    print(f"  Frases carregadas   : {len(frases)}")
    print("=" * 60)

    for i, frase in enumerate(frases, start=1):
        print(f"\nPaciente {i:02d}: {frase}")
        resultados = identificar_sintomas_e_diagnostico(frase, mapa)

        if resultados:
            print(f"  -> {len(resultados)} possível(is) diagnóstico(s):")
            for r in resultados:
                sintomas_str = ', '.join(r['sintomas_identificados'])
                print(f"     • {r['diagnostico_sugerido']}")
                print(f"       (Sintomas detectados: {sintomas_str})")
        else:
            print("  -> Nenhum diagnóstico identificado no mapa de conhecimento.")

    print("\n" + "=" * 60)
    print("  Análise concluída.")
    print("=" * 60)

# -----------------------------------------------------------
# 5. Ponto de entrada
# -----------------------------------------------------------
if __name__ == '__main__':
    analisar_frases()
