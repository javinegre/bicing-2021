export interface INotificationItem {
  id?: string;
  content: JSX.Element | string;
  timeout?: number;
}
