import * as yup from 'yup';

import AddIcon from 'components/icons/AddIcon';
import ArrowIcon from 'components/icons/ArrowIcon';
import BankingCardIcon from 'components/icons/BankingCardIcon';
import BeautyIcon from 'components/icons/BeautyIcon';
import BitcoinIcon from 'components/icons/BitcoinIcon';
import BurgerIcon from 'components/icons/BurgerIcon';
import CarIcon from 'components/icons/CarIcon';
import CartIcon from 'components/icons/CartIcon';
import CashIcon from 'components/icons/CashIcon';
import CheckedCircleIcon from 'components/icons/CheckedCircleIcon';
import CheckedSquareIcon from 'components/icons/CheckedSquareIcon';
import CloseIcon from 'components/icons/CloseIcon';
import ClothesIcon from 'components/icons/ClothesIcon';
import CryptoIcon from 'components/icons/CryptoIcon';
import DebtIcon from 'components/icons/DebtIcon';
import DonateIcon from 'components/icons/DonateIcon';
import EditIcon from 'components/icons/EditIcon';
import EducationIcon from 'components/icons/EducationIcon';
import EmotionIcon from 'components/icons/EmotionIcon';
import EntertainmentsIcon from 'components/icons/EntertainmentsIcon';
import ErrorIcon from 'components/icons/ErrorIcon';
import EyeIcon from 'components/icons/EyeIcon';
import FoodIcon from 'components/icons/FoodIcon';
import FridgeIcon from 'components/icons/FridgeIcon';
import GiftIcon from 'components/icons/GiftIcon';
import GymIcon from 'components/icons/GymIcon';
import HandShakingIcon from 'components/icons/HandShakingIcon';
import HealthIcon from 'components/icons/HealthIcon';
import HiddenEyeIcon from 'components/icons/HiddenEyeIcon';
import HomeIcon from 'components/icons/HomeIcon';
import InfoIcon from 'components/icons/InfoIcon';
import MoonIcon from 'components/icons/MoonIcon';
import MoreIcon from 'components/icons/MoreIcon';
import OutlinedCircleIcon from 'components/icons/OutlinedCircleIcon';
import OutlinedSquareIcon from 'components/icons/OutlinedSquareIcon';
import PictureIcon from 'components/icons/PictureIcon';
import RemoveIcon from 'components/icons/RemoveIcon';
import SubscriptionIcon from 'components/icons/SubscriptionIcon';
import SunIcon from 'components/icons/SunIcon';
import TaxiIcon from 'components/icons/TaxiIcon';
import TherapyIcon from 'components/icons/TherapyIcon';
import TopArrowIcon from 'components/icons/TopArrowIcon';
import TransportIcon from 'components/icons/TransportIcon';
import UploadIcon from 'components/icons/UploadIcon';
import WalletIcon from 'components/icons/WalletIcon';
import { IIconProps } from 'components/icons/types/iconProps';

export const DEFAULT_ACCOUNT_ICON_NAME = 'wallet';
export const DEFAULT_CATEGORY_ICON_NAME = 'burger';

export const ENTITY_ICONS = new Map<string, React.FC<IIconProps>>([
    ['add', AddIcon],
    ['arrow', ArrowIcon],
    ['banking-card', BankingCardIcon],
    ['beauty', BeautyIcon],
    ['bitcoin', BitcoinIcon],
    [DEFAULT_CATEGORY_ICON_NAME, BurgerIcon],
    ['car', CarIcon],
    ['cart', CartIcon],
    ['cash', CashIcon],
    ['checked-circle', CheckedCircleIcon],
    ['checked-square', CheckedSquareIcon],
    ['close', CloseIcon],
    ['clothes', ClothesIcon],
    ['crypto', CryptoIcon],
    ['debt', DebtIcon],
    ['donate', DonateIcon],
    ['edit', EditIcon],
    ['error', ErrorIcon],
    ['eye', EyeIcon],
    ['hidden-eye', HiddenEyeIcon],
    ['info', InfoIcon],
    ['moon', MoonIcon],
    ['more', MoreIcon],
    ['outlined-circle', OutlinedCircleIcon],
    ['outlined-square', OutlinedSquareIcon],
    ['picture', PictureIcon],
    ['remove', RemoveIcon],
    ['sun', SunIcon],
    ['top-arrow', TopArrowIcon],
    ['upload', UploadIcon],
    [DEFAULT_ACCOUNT_ICON_NAME, WalletIcon],
    ['hand-shaking', HandShakingIcon],
    ['food', FoodIcon],
    ['fridge', FridgeIcon],
    ['entertainments', EntertainmentsIcon],
    ['taxi', TaxiIcon],
    ['transport', TransportIcon],
    ['home', HomeIcon],
    ['health', HealthIcon],
    ['subscription', SubscriptionIcon],
    ['gym', GymIcon],
    ['therapy', TherapyIcon],
    ['emotion', EmotionIcon],
    ['gift', GiftIcon],
    ['education', EducationIcon],
]);

export const DEFAULT_ENTITY_ICON_COLOR = '#000000';

export const ENTITY_ICON_NAME_VALIDATION = yup
    .string()
    .nullable()
    .oneOf([...ENTITY_ICONS.keys()]);
