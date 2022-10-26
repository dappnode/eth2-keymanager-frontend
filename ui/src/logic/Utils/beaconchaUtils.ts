export function hasIndexes(beaconchaUrl: string): boolean {
  return !beaconchaUrl.split("=")[1];
}
