// Function to validate if all the parameters exists
export const isParamsExist = (
  fileName: string,
  width: string,
  height: string
): boolean => !!(fileName && width && height);

// Function to validate if the dimentions are positive numbers > 0
export const isValidDimension = (width: string, height: string): boolean =>
  +(width as string) > 0 && +(height as string) > 0;
