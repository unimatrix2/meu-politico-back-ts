import { IModerationEnum } from "../interfaces/enum";

export const moderationEnum: IModerationEnum[] = [
    IModerationEnum.Publish,
    IModerationEnum.Published,
    IModerationEnum.Edit,
    IModerationEnum.Edited,
    IModerationEnum.Archive,
    IModerationEnum.Archived,
];

export default moderationEnum;