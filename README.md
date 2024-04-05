## Structure de l'application (sans framework)
```
src/
├── --tests--/  # tests
│   ├── e2e/  # tests end-to-end
│   ├── msw/  # mock des calls api
│   ├── usecases/  # tests d'intégration
|
├── domain/  # métier
│   ├── entities/ # interfaces des entités métier
│   ├── models/ # classes métiers
│   ├── usecases/ # fonctions métier qui appellent les slices redux
│   ...
│
├── infrastructure/  # gestion des données
│   ├── api/  # Styles de base pour tout le site
|   |   ├── axiosInstance.tsx # instance d'axios avec msw et sans
│   ├── auth/ 
│   │   ├── TokenRepositoryLocalStorage.ts  # gestion du localStorage avec authToken
│   ├── repositories/  # accès aux données
│   ├── store/  # store redux
│   │   ├── slices/ #slices redux
│   │       ├── index.ts # combineReducer
│   │       ├── ...
|   |   ├── index.ts # init du store et custom hooks redux pour types (useSelector et useDispatch)
```