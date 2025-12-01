# Test de Pagination et Filtrage

## Prérequis
Assurez-vous que le serveur est lancé avec `npm run dev`

## Tests de base

### 1. Récupérer tous les todos (page 1, 10 éléments par défaut)
```bash
curl "http://localhost:3000/todos"
```

**Réponse attendue:**
```json
{
  "data": [...],
  "pagination": {
    "total": 20,
    "page": 1,
    "limit": 10,
    "totalPages": 2
  }
}
```

---

## Tests de pagination

### 2. Page 1, 5 éléments par page
```bash
curl "http://localhost:3000/todos?page=1&limit=5"
```

### 3. Page 2, 5 éléments par page
```bash
curl "http://localhost:3000/todos?page=2&limit=5"
```

### 4. Limite de 3 éléments
```bash
curl "http://localhost:3000/todos?limit=3"
```

---

## Tests de filtrage

### 5. Seulement les todos complétés
```bash
curl "http://localhost:3000/todos?completed=true"
```

### 6. Seulement les todos non complétés
```bash
curl "http://localhost:3000/todos?completed=false"
```

---

## Tests combinés (filtrage + pagination)

### 7. Todos non complétés, page 1, 5 éléments
```bash
curl "http://localhost:3000/todos?completed=false&page=1&limit=5"
```

### 8. Todos complétés, page 2, 10 éléments
```bash
curl "http://localhost:3000/todos?completed=true&page=2&limit=10"
```

---

## Créer des données de test

Pour tester la pagination, vous devez d'abord créer plusieurs todos:

```bash
# Créer 15 todos pour tester
for i in {1..15}; do
  curl -X POST http://localhost:3000/todos \
    -H "Content-Type: application/json" \
    -d "{\"title\": \"Todo numéro $i\", \"description\": \"Description détaillée du todo numéro $i\", \"completed\": $((i % 2 == 0))}"
done
```

Puis testez la pagination:
```bash
# Afficher 5 todos par page
curl "http://localhost:3000/todos?limit=5"

# Page 2
curl "http://localhost:3000/todos?page=2&limit=5"

# Page 3
curl "http://localhost:3000/todos?page=3&limit=5"
```
