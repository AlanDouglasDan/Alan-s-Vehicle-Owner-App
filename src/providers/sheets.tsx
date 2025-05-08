import {registerSheet} from 'react-native-actions-sheet';

import {TermsPrivacy} from './components/TermsPrivacy';
import {DeleteRequest} from './components/DeleteRequest';
import {ContactInformation} from './components/ContactInformation';
import {HandleBid} from './components/HandleBid';
import {ServiceDetails} from './components/ServiceDetails';
import {AcceptRecommendation} from './components/AcceptRecommendation';
import {CarDetails} from './components/CarDetails';
import { DeleteVehicle } from './components/DeleteVehicle';

registerSheet('terms-privacy', TermsPrivacy);
registerSheet('delete-request', DeleteRequest);
registerSheet('contact-information', ContactInformation);
registerSheet('handle-bid', HandleBid);
registerSheet('service-details', ServiceDetails);
registerSheet('accept-recommendation', AcceptRecommendation);
registerSheet('car-details', CarDetails);
registerSheet('delete-vehicle', DeleteVehicle);

export {};
