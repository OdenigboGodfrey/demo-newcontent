export default class EmailDTO {
  emailTo: string;
  emailFrom: string;
  emailMessage: string;
  emailSubject: string;
  emailCC: string;
  status: string;
  created_at: Date;
  deleted_at: Date;
  emailHtml: string;
  source: string;
}
