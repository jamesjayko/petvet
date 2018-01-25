import React, { Component } from "react";

import Logo from "../../../../server/images/petvet_logo.png";
import { connect } from "react-redux";
import { fetchMedicalData, editMedicalRecord } from "../../actions/";

class RecordItem extends Component {

    constructor(props){
        super(props);
        this.state= {
            canEdit: false,
            form: {
                type: null,
                date: null,
                details: null
            }
        }
    }
  componentWillMount() {
    console.log('the props upon mount: ', this.props);
    this.props.fetchMedicalData(this.props.match.params.recordId).then(()=>{
        this.setState({
            canEdit: false,
            form:{
                type: this.props.petMedical[0].type,
                date: this.props.petMedical[0].date,
                details: this.props.petMedical[0].details,
            }
        })
    });
  }

  handleEditClick(){
      this.setState({
            canEdit: true
        });

  }
  renderButton(){
      if(this.state.canEdit){
          return <button onClick={()=>this.saveChanges()} className='btn btn-success pull-right'>Save Changes</button>
      }
  }
  saveChanges(){
      const params= this.props.match.params;
      this.setState({...this.state.form, canEdit: false,});
      console.log('this is the current state after clicking save changes', this.state.form);

      this.props.editMedicalRecord(this.state.form, params).then(()=>{
          this.props.fetchMedicalData(params.recordId).then(()=>{
              if(!this.props.petMedical) return <h1>Loading</h1>;
              this.setState({
                  form:{
                      type: this.props.petMedical[0].type,
                      date: this.props.petMedical[0].date,
                      details: this.props.petMedical[0].details,
                  }
              })
          })
      });

  }
  handleChange(e){
      const {value, name}= e.target;
      const {form} = this.state;
      form[name]= value;
      this.setState({form: {...form}});
      console.log(e.target.value);
  }
  render() {
    if (!this.props.petMedical.length) {
      return <h1>Loading</h1>;
    }
      const {form: {type,date,details},canEdit}= this.state;
     // const {editType, editDate, editDetails} =this.state.form;
      const staticData = (
          <div>
              <div>
                  <h2 className='text-center medicalRecordHeader'>Medical Record</h2>
                  <button onClick={()=>this.handleEditClick()}
                          className='btn btn-warning editBtn'
                          style={this.props.vetAccessLevel? {'display':'none'}: {'display':'inline-block'}}
                  >Edit</button>
                  <h4 className="record_item_header">Type: {type}</h4>
                  <h4 className="record_item_date" >Date: {date}</h4>
                  <hr />
              </div>
              <div>
                  <h4 className='text-center'>Details</h4>
                  <p className="record_item_detail">{details}</p>
              </div>
          </div>

      );
      const editData =(
          <form>
              <h2 className='text-center'>Medical Record</h2>
              <div className='form-group'>
                  <label>Title</label>
                  <input onChange={(e)=>this.handleChange(e)} type= 'text' name='type' value ={type} className="record_item_header form-control"></input>
              </div>
              <div className='form-group'>
                  <label>Date</label>
                  <input onChange={(e)=>this.handleChange(e)}  type ='date' name='date' value ={date} className="record_item_date form-control"></input>
              </div>
              <hr />
              <div className="form-group">
                  <label>Details</label>
                  <textarea onChange={(e)=>this.handleChange(e)} type='text' name='details' value ={details} className='form-control' rows='10'></textarea>
              </div>
          </form>
      );
      const viewData= canEdit? editData: staticData;
      return (

        <div className="bodyContainer">
            {viewData}
            {canEdit? this.renderButton(): ''}
        </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    petMedical: state.petMedical,
      vetAccessLevel: state.vetlogin.accessLevel
  };
}

export default connect(mapStateToProps, {
  fetchMedicalData: fetchMedicalData,
  editMedicalRecord: editMedicalRecord
})(RecordItem);
