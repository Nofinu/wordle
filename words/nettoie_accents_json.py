import json
import unicodedata
import sys
import os

def remove_accents(text):
    if isinstance(text, str):
        return ''.join(
            c for c in unicodedata.normalize('NFD', text)
            if unicodedata.category(c) != 'Mn'
        )
    return text

def strip_accents_from_json(data):
    if isinstance(data, dict):
        return {
            remove_accents(k): strip_accents_from_json(v)
            for k, v in data.items()
        }
    elif isinstance(data, list):
        return [strip_accents_from_json(item) for item in data]
    elif isinstance(data, str):
        return remove_accents(data)
    else:
        return data

def process_json_file(input_path, output_path=None):
    with open(input_path, 'r', encoding='utf-8') as infile:
        data = json.load(infile)
    
    clean_data = strip_accents_from_json(data)
    
    if not output_path:
        base, ext = os.path.splitext(input_path)
        output_path = f"{base}_sans_accents{ext}"
    
    with open(output_path, 'w', encoding='utf-8') as outfile:
        json.dump(clean_data, outfile, ensure_ascii=False, indent=2)
    
    print(f"✅ Fichier nettoyé enregistré ici : {output_path}")

# --- Utilisation en ligne de commande ---
if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage : python nettoie_accents_json.py fichier_entree.json [fichier_sortie.json]")
        sys.exit(1)
    
    input_file = sys.argv[1]
    output_file = sys.argv[2] if len(sys.argv) >= 3 else None
    
    process_json_file(input_file, output_file)