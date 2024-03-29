import { BookOpenIcon, QuestionMarkCircleIcon } from '@heroicons/react/outline';
import { t } from '@lingui/macro';
import { ReactNode } from 'react';
import { ROUTES } from 'src/components/primitives/Link';

import DiscordIcon from '/public/icons/discord.svg';
import GithubIcon from '/public/icons/github.svg';
import AaveClassic from '/public/icons/aave_classic.svg';

import { MarketDataType } from '../marketsConfig';
import { ENABLE_TESTNET } from 'src/utils/marketsAndNetworksConfig';

interface Navigation {
  link: string;
  title: string;
  isVisible?: (data: MarketDataType) => boolean | undefined;
  dataCy?: string;
}

export const navigation: Navigation[] = [
  {
    link: ROUTES.dashboard,
    title: t`Pools`,
    dataCy: 'menuDashboard',
  },
  {
    link: ROUTES.farm,
    title: t`Farm`,
    dataCy: 'menuFarm',
  },
  {
    link: ROUTES.position,
    title: t`My Position`,
    dataCy: 'menuMyPosition',
  },
  {
    link: ROUTES.markets,
    title: t`Markets`,
    dataCy: 'menuMarkets',
  },
  {
    link: ROUTES.bridge,
    title: t`Bridge`,
    dataCy: 'menuBridge',
  },
  // {
  //   link: ROUTES.staking,
  //   title: t`Stake`,
  //   dataCy: 'menuStake',
  //   isVisible: () => process.env.NEXT_PUBLIC_ENABLE_STAKING === 'true' && !ENABLE_TESTNET,
  // },
  // {
  //   link: ROUTES.governance,
  //   title: t`Vote`,
  //   dataCy: 'menuGovernance',
  //   isVisible: () => process.env.NEXT_PUBLIC_ENABLE_GOVERNANCE === 'true' && !ENABLE_TESTNET,
  // },
  // {
  //   link: ROUTES.referral,
  //   title: t`Referral`,
  //   dataCy: 'menuReferral',
  // },
  {
    link: ROUTES.faucet,
    title: t`Faucet`,
    isVisible: () => process.env.NEXT_PUBLIC_ENV === 'staging' || ENABLE_TESTNET,
  },
];

interface MoreMenuItem extends Navigation {
  icon: ReactNode;
}

const moreMenuItems: MoreMenuItem[] = [
  {
    link: 'https://docs.aave.com/faq/',
    title: t`FAQ`,
    icon: <QuestionMarkCircleIcon />,
  },
  // {
  //   link: 'https://docs.aave.com/portal/',
  //   title: t`Developers`,
  //   icon: <BookOpenIcon />,
  // },
  {
    link: 'https://discord.gg/7kHKnkDEUf',
    title: t`Discord`,
    icon: <DiscordIcon />,
  },
  // {
  //   link: 'https://github.com/aave/interface',
  //   title: t`Github`,
  //   icon: <GithubIcon />,
  // },
  // {
  //   link: 'https://classic.aave.com',
  //   title: t`Switch to Aave Classic`,
  //   icon: <AaveClassic />,
  // },
];

const DaoMenuItems: MoreMenuItem[] = [
  {
    link: '/calc',
    title: t`Calculator`,
    icon: <></>,
  },
  {
    link: '/staking',
    title: t`Staking`,
    icon: <></>,
  },
  {
    link: '/vote',
    title: t`Vote`,
    icon: <></>,
  },
  {
    link: '/gauge_weight_vote',
    title: t`Gauge Weight Voting`,
    icon: <></>,
  },
  {
    link: '/farm',
    title: t`Farm`,
    icon: <></>,
  },
];

export const moreMenuExtraItems: MoreMenuItem[] = [];
export const moreMenuMobileOnlyItems: MoreMenuItem[] = [];

export const moreNavigation: MoreMenuItem[] = [...moreMenuItems, ...moreMenuExtraItems];
export const DaoMenuList: MoreMenuItem[] = [...DaoMenuItems];

export const mobileNavigation: Navigation[] = [
  ...navigation,
  ...moreMenuItems,
  ...moreMenuMobileOnlyItems,
];
