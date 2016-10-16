export class DXCode {
  id?: string;
  commentClass: string;
  reasonClass: string;
  dxcode: {
  		dxId: string;
  		dxCode: string;
  		dxDesc: string;
  }

  provider: {
  		pid: string;
  		fullName: string;
  		npi: string;
  }
  invalid: boolean;
  comment: string;
  reason: string;
  status: string;
}
