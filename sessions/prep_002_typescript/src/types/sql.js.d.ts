declare module 'sql.js' {
  export interface Database {
    run(sql: string, params?: any[]): void;
    exec(sql: string, params?: any[]): any[];
    export(): Uint8Array;
    close(): void;
  }

  function initSqlJs(config?: any): Promise<any>;
  export default initSqlJs;
}
