import { Constants } from './constantes';

export class Utils {
  public static sortDataTable = (
    data: any[],
    column: string,
    sortOrder: string
  ) => {
    data.sort((a, b) => {
      let valueA = a[column];
      let valueB = b[column];

      // Si los valores son cadenas, se convierten a minúsculas para una comparación case-insensitive
      if (typeof valueA === 'string') valueA = valueA.toLowerCase();
      if (typeof valueB === 'string') valueB = valueB.toLowerCase();

      if (valueA > valueB) return sortOrder === 'asc' ? 1 : -1;
      if (valueA < valueB) return sortOrder === 'asc' ? -1 : 1;
      return 0;
    });
  };

  public static getPermisosPerfil = <T extends keyof typeof Constants.navegacion>(
    perfil: T,
  ) => {
    return Constants.navegacion[perfil];
  };
}
