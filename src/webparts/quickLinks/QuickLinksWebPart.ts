import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  IPropertyPaneConfiguration
 
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import * as strings from 'QuickLinksWebPartStrings';
import QuickLinks from './components/QuickLinks';
import { IQuickLinksProps } from './components/IQuickLinksProps';
import { CustomCollectionFieldType, PropertyFieldCollectionData } from '@pnp/spfx-property-controls/lib/PropertyFieldCollectionData';
import { PropertyFieldOrder } from '@pnp/spfx-property-controls/lib/PropertyFieldOrder';
export interface IQuickLinksWebPartProps {
  links: IList[];
}
export interface IList {
  title: string;
  url: string;
  color: string;
  icon:string;
}

export default class QuickLinksWebPart extends BaseClientSideWebPart<IQuickLinksWebPartProps> {

  public render(): void {
    const element: React.ReactElement<IQuickLinksProps> = React.createElement(
      QuickLinks,
      {
        links: this.properties.links
      }
    );

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }
  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages:
        [{header: {
          description: "Quicklinks (sortable)"
        },
          groups:
            [{
              groupFields:
                [PropertyFieldCollectionData('links', {
                  label: "",
                  value: this.properties.links, key: "123",
                  panelHeader: "", panelDescription: "",
                  manageBtnLabel: "Edit links", enableSorting: true,
                  fields: [
                    { id: "title", title: "Title", type: CustomCollectionFieldType.string, required: true },
                    { id: "url", title: "Url", type: CustomCollectionFieldType.url, required: false },
                    { id: "color", title: "Color", type: CustomCollectionFieldType.string, required: false },
                    { id: "icon", title: "Icon", type: CustomCollectionFieldType.fabricIcon, required: false },
                  ]
                }), PropertyFieldOrder("orderedItems", {
                  key: "orderedItems",
                  label: "Order Links",
                  items: this.properties.links,
                  textProperty: "title",
                  properties: this.properties,                 
                  onPropertyChange: this.onPropertyPaneFieldChanged
                })]
            }]
        }]
    };
  }
}
