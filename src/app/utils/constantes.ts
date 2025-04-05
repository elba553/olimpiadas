export class Constants {
  public static paginacion = {
    defaultSize: 10,
    items: [5, 10, 20, 25, 30],
  };

  public static auth = {
    appKey: 'jgapps',
    usuarioKey: 'usuario',
    expirationKey: 'tokenExpiration',
    expirationTime: 3600000
  };

  public static navegacion =   {
    '1': {
      EXPEDIENTES_POR_ARCHIVAR: {
        btnBuscar: true,
        btnReporte: true,
        btnArchivar: true,
        btnDevolver: true,
        listData: true,
        colAcciones: true
      },
    },
    '2': {
      EXPEDIENTES_ARCHIVADOS: {
        btnBuscar: true,
        btnReporte: true,
        btnHistorial: true,
        btnVerDetalle: true,
        listData: true,
      },
      HISTORIAL_EXPEDIENTE: {
        listData: true,
      },
      VER_DETALLE_EXPEDIENTE: {
        listData: true,
      },
    },
    '3': {
      EXPEDIENTES_ARCHIVADOS: {
        btnBuscar: true,
        btnReporte: true,
        btnHistorial: true,
        btnVerDetalle: true,
        listData: true,
      },
      HISTORIAL_EXPEDIENTE: {
        listData: true,
      },
      VER_DETALLE_EXPEDIENTE: {
        listData: true,
      },
    },
  };
}
