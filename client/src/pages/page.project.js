import React from 'react';
import {connect} from 'react-redux';
import MyNav from '../components/component.mynav';
import styles from './pages.module.scss';
import * as allAction from '../actions';

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.getCategoryAll();
  }

  update() {
    this.setState({ts: new Date()});
  }

  async getCategoryAll() {
    await this.props.categoryListAll();
    this.update();
  }

  async getCategory() {
    await this.props.categoryList();
    allAction.Utility.NotifyUpdate.next(true);
  }

  async handleEdit(item) {
    const data = {...item};
    data.name = item.newValue;
    await this.props.categoryEdit(item.id, data);
    this.getCategoryAll()
    this.getCategory();
  }

  buildRowHtml() {
    const {all} = this.props.category;
    if (!allAction.Utility.IsArray(all)) {
      return (
        <tr>
          <td></td>
        </tr>
      );
    }
    return all.map((item, index) => {
      return (
        <tr key={item.id}>
          <td>{index + 1}</td>
          <td>
            {item.isEdit ? (
              <input
                value={item.newValue || item.name}
                onBlur={this.handleEdit.bind(this, item)}
                onChange={(e) => {
                  item.newValue = e.target.value;
                  this.update();
                }}
              />
            ) : (
              item.name
            )}
          </td>
          <td>
            <input
              type="checkbox"
              disabled={!item.isEdit}
              checked={item.state}
              onChange={async () => {
                item.state = !item.state;
                await this.props.categoryEdit(item.id, item);
                this.getCategory();
                this.update();
              }}
            />
          </td>
          <td>
            <button
              onClick={() => {
                item.isEdit = !item.isEdit;
                this.update();
              }}
            >
              {item.isEdit ? 'Cancel' : 'Edit'}
            </button>
          </td>
        </tr>
      );
    });
  }

  render() {
    return (
      <div className={styles.category}>
        <MyNav {...this.props} />
        <div className={styles.aa}>
          <table>
            <thead>
              <tr>
                <th> ID </th>
                <th> Name </th>
                <th> State </th>
                <th> </th>
              </tr>
            </thead>
            <tbody>{this.buildRowHtml()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default connect((state) => ({...state}), {...allAction})(Category);

// return all.map((item, index) => {
//   return (
//     <tr key={item.id}>
//       <td>{index + 1}</td>
//       <td>

//       </td>
//       <td>
//         <input
//           type="checkbox"
//           readOnly={!item.isEdit}
//           value={item.state}
//           onChange={async () => {
//             item.state = !item.state;
//             await this.props.categoryEdit(item.id, item);
//             this.update();
//           }}
//         />
//       </td>
//       <td>

//       </td>
//     </tr>
//   );
// });
