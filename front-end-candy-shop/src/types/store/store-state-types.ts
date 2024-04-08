export type ModalsState = {
  [key: string]: {
    // тут и так все понятно
    isOpen: boolean;
    // будет типизироваться в процессе переезда
    data?: any;
  };
}


export type StoreState = {
  modals: ModalsState;
}
