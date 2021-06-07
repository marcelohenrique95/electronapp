export class ProxyModel {
  public id?: string;
  public ip: string;
  public port: string;
  public userProxy: string;
  public passwordProxy: string;
  public activeProxy: boolean;
  public entityName = 'proxy';
}
