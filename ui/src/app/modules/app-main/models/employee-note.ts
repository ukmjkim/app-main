import { AidDateFormatPipe } from '@ukmjkim/aid-lib-services';

export class EmployeeNote {
  sellerContractNoteId: number;
  id: number;
  noteInfoId: number;
  noteInfo: string;
  createdByUser: string;
  createdById: number;
  created: string;
  createdTS: number;
  createdDate: string;


  public static createSellerContractNoteListFromJson(noteJson): EmployeeNote[] {
    if (!noteJson) {
      return null;
    }

    const sellerContractNoteList: EmployeeNote[] = [];
    const sellerContractNotes = noteJson as EmployeeNote[];
    if (sellerContractNotes.length > 0) {
      sellerContractNotes.forEach(sellerContractNote => {
        const sellerContractNoteObj: EmployeeNote = Object.assign(new EmployeeNote(), sellerContractNote);
        sellerContractNoteObj.createdDate = new AidDateFormatPipe().transform(sellerContractNoteObj.createdTS);
        sellerContractNoteObj.created = sellerContractNoteObj.createdByUser + ' on ' + sellerContractNoteObj.createdDate;

        sellerContractNoteList.push(sellerContractNoteObj);
      })
    }

    return sellerContractNoteList;
  }
}
