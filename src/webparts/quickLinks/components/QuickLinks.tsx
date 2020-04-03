import * as React from 'react';
import styles from './QuickLinks.module.scss';
import { IQuickLinksProps } from './IQuickLinksProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { IList } from '../QuickLinksWebPart';
import { Icon } from '@fluentui/react/lib/Icon';

export default class QuickLinks extends React.Component<IQuickLinksProps, {}> {
  private mapItems(item: IList, index): any {
    const style = { 'backgroundColor': item.color };
    const MyIcon = () => <Icon iconName={item.icon} />;
    return (<a href={item.url} key={index}  target="_blank"><div style={style} className={styles.quicklink}>
              <div className={styles.icon}><MyIcon/></div> 
      <span>{item.title}</span>
    </div></a>);
  }
  public render(): React.ReactElement<IQuickLinksProps> {
    return (
      <div className={styles.quickLinks}>
        {this.props.links && this.props.links.map((item, index) =>
          this.mapItems(item, index))}
      </div>
    );
  }
}
