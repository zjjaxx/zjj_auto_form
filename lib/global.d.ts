declare module "*.less" {
  const resource: { [key: string]: string };
  export = resource;
}
declare interface Schema {
  type?: string;
}
