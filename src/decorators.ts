export function Validators(params: ValidatorsParams) {
    return function (_target: any, key: string): any {
      let localValue: string | any[] | null | undefined;
      let descriptor: PropertyDescriptor = {
        set: function (value) {
          localValue = value;
          if (!params.AllowNull && params.AllowNull !== undefined) {
            if (localValue === null || localValue === undefined) {
              throw new Error(`La propiedad "${key}" no acepta valores nulos`);
            }
          }
  
          if (params.StringLength) {
            if (localValue) {
              if (localValue.length > params.StringLength) {
                throw new Error(
                  `La propiedad "${key}" excede el tamaño máximo establecido: valor actual = ${localValue.length} valor permitido = ${params.StringLength}`
                );
              }
            }
          }
        },
        get: function () {
          return localValue;
        },
      };
  
      return descriptor;
    };
  }
  
  export class ValidatorsParams {
    AllowNull? = true;
    StringLength?: number;
  }
  