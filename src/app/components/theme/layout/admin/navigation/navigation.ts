import {Injectable} from '@angular/core';

export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  function?: any;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: Navigation[];
}

export interface Navigation extends NavigationItem {
  children?: NavigationItem[];
}

const NavigationItems = [
  {
    id: 'navigation',
    title: 'Navegação',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'dashboard',
        title: 'Dashboard',
        type: 'item',
        url: '/dashboard/default',
        icon: 'feather icon-home',
        classes: 'nav-item',
      }
    ]
  },

  {
    id: 'Archives',
    title: 'Arquivos',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'upload-file',
        title: 'Transmitir Arquivos',
        type: 'item',
        url: '/upload-file',
        classes: 'nav-item',
        icon: 'feather icon-file-plus'
      },
      {
        id: 'receive-file',
        title: 'Receber Arquivos',
        type: 'item',
        url: '/receive-file',
        classes: 'nav-item',
        icon: 'feather icon-download-cloud'
      },
      {
        id: 'provide-file',
        title: 'Disponibilizar Arquivos',
        type: 'item',
        url: '/provide-file',
        class:'nav-item',
        icon: 'icon-folder'
      },
      {
        id: 'traceability',
        title: 'Rastreabilidade',
        type: 'item',
        url: '/traceability',
        class:'nav-item',
        icon: 'icon-search'
      },
    ]
  },
  {
    id: '',
    title: '',
    type: 'group',
    icon: '',
    children: []
  },
  {
    id: '',
    title: '',
    type: 'group',
    icon: '',
    children: [
      {
        id: 'contact',
        title: 'Contato TIVIT',
        type: 'item',
        url: '/contact',
        class:'nav-item',
        icon: 'icon-phone-call'
      }
    ]
  },
  {
    id: '',
    title: '',
    type: 'group',
    icon: '',
    children: []
  },
  {
    id: '',
    title: '',
    type: '',
    icon: '',
    children: []
  },

  {
    id: 'admin',
    title: 'ADMIN',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: '',
        title: '',
        type: '',
        url: '',
        class:'',
        icon: ''
      },
      {
        id: 'configuration',
        title: 'Configuração',
        type: 'item',
        url: '/configuration',
        class:'nav-item',
        icon: 'icon-settings'
      }
    ]
  }
];

@Injectable()
export class NavigationItem {
  get() {
    return NavigationItems;
  }
}
