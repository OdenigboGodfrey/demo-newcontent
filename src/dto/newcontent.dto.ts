export class NewContentDTO {
  Html_content: string;
  Replace: ReplaceContentDTO[];
}

export class ReplaceContentDTO {
  value: string;
  toBeReplacedWith: string;
}
