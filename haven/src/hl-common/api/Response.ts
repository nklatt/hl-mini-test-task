export class ApiRes<T> {
  readonly data: T;

  constructor(data: T) {
    this.data = data;
  }
}

type PagingById<T> = {
  size: number;
  nextIdFn: (item: T) => number;
};

export class ApiResArray<T> {
  readonly data: T[];
  readonly nextId?: number;

  constructor(data: T[], paging?: PagingById<T>) {
    this.data = data;
    this.nextId = undefined;

    if (paging && data.length > paging.size) {
      this.data = this.data.slice(0, paging.size);
      this.nextId = paging.nextIdFn(data[paging.size]);
    }
  }
}

export class ApiResSuccess {
  readonly success: boolean;

  constructor(success: boolean) {
    this.success = success;
  }
}
