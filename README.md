# Fokjlenot v2

This is my first application with clean architecture pattern.
I'm redoing an old project management application that I made 3 years ago.
Feel free to update it and push it on new branch.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Redux](https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white) ![Javascript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![Testing library](https://img.shields.io/badge/testing%20library-323330?style=for-the-badge&logo=testing-library&logoColor=red) ![html](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) ![sass](https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white)

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
