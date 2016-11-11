export class DXCode {
  id?: string;
  dxCode: {
  		dxId: string;
  		dxCode: string;
  		dxDesc: string;
      hcc: string;
  }
  provider: {
  		pid: string;
  		fullName: string;
  		npi: string;
  }
  invalid: boolean;
  comment: string;
  reasonId: number;
  status: string;
  insertType: string;
}

export class Reasons {
  id: number;
  statement: string;
}
