
import { DbAddSpeakerSurgery } from "../../../data/usecases/speaker-surgery/db-speaker-surgery";
import { DbAddSpeaker } from "../../../data/usecases/speaker/db-add-speaker";
import { SpeakerSurgeryRepository } from "../../../infra/db/repositories/speaker-surgery/speaker-surgery-repository";
import { SpeakerRepository } from "../../../infra/db/repositories/speaker/speaker-repository";
import { LogWinstonRepository } from "../../../infra/local/log-repository/log-repository";

import { AddSpeakerController } from "../../../presentation/controllers/speaker/add-speaker";
import { Controller } from "../../../presentation/protocols";
import { LogControllerDecorator } from "../../decoratos/logs";


export const makeSaveSpeakerController = (): Controller => {
    const addSpeakerRepository = new SpeakerRepository();
    const addSpeakerSurgeryRepository = new SpeakerSurgeryRepository();
    const addSpeaker = new DbAddSpeaker(addSpeakerRepository);
    const addSpeakerSurgery = new DbAddSpeakerSurgery(addSpeakerSurgeryRepository);
    const addSpeakerController = new AddSpeakerController(addSpeaker, addSpeakerSurgery);
    const logWinstonRepository = new LogWinstonRepository()
    return new LogControllerDecorator(addSpeakerController, logWinstonRepository);
}
