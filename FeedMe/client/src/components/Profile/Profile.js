import React, { Component } from "react";
import './Profile.css'
import { MdEdit } from 'react-icons/md'
import {Form,Button} from 'react-bootstrap'
import {Gmail} from '../Register/Register'


class Profile extends Component {
  constructor(props){
    super(props)
        this.state = {
      profile: {
        id:this.nextID(),
        gmailAccount:"",
        prohibitions:"",
        imageUrl:"",
        userName:""
      },
      editing:false,
    }

    this.getData = this.getData.bind(this)
    this.add = this.add.bind(this)
    this.nextID = this.nextID.bind(this)
    this.save = this.save.bind(this)
    this.edit = this.edit.bind(this)
    this.handleImageUrl = this.handleImageUrl.bind(this)
    this.handleProhabition = this.handleProhabition.bind(this)
    this.handleUserName = this.handleUserName.bind(this)
    this.setDataInDB = this.setDataInDB.bind(this)
  }
  componentDidMount(){
     this.getData()
  }
  nextID(){
    this.uniqueId = this.uniqueId || 0
    return this.uniqueId++
}
  getData(){
    if(!Gmail){
            console.log("Need to log in")
            return;
        }
    this.setState({profile:[]})
    const url = `https://feedme24.herokuapp.com/getProfileByGmailAccount?gmailAccount=${Gmail}`;    //******** */
    fetch(`${url}`)
    .then(res=>res.json())
    .then(data=>data.map(profile =>
         this.add(profile.gmailAccount,profile.prohibitions,profile.imageUrl,profile.userName)
        ))
        .catch(err => console.error(err))

  }
  add(gmailAccount=null,prohibitions=null,imageUrl=null,userName=null){
    this.setState(() =>({
      profile: 
            {
                id:this.nextID(),
                gmailAccount:gmailAccount,
                prohibitions:prohibitions,
                imageUrl:imageUrl,
                userName:userName

            }, 
    }))
}
eachProfile(profile,i){
  return(
    <div key={`profile${i}`}>
    <img alt="" className="profileImg" src={profile.imageUrl}></img>
    <h2 className="profileName">{profile.userName}</h2>
    <h3 className="profileDetails">{profile.gmailAccount}</h3>
    <h4 className="profileDetails">Prohabitions: {profile.prohibitions}</h4>
    <MdEdit className="editIcon" />
    </div>
  )
}
edit() {
  this.setState({editing: true})
}
setDataInDB(){
  if(!Gmail)
        {
            console.log("Need to log in")
            return;
        }
  let userName = this.userName ? this.userName : this.state.profile.userName
  let prohibitions = this.prohibitions ? this.prohibitions : this.state.profile.prohibitions
  let imageUrl = this.imageUrl ? this.imageUrl : this.state.profile.imageUrl
  const url = "https://feedme24.herokuapp.com/editProfile";   
  fetch(`${url}`,{
    method:'POST',
    body:`userName=${userName}&prohibitions=${prohibitions}&imageUrl=${imageUrl}&gmailAccount=${this.state.profile.gmailAccount}`,                   
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    }
 })
 .then(res => res.json())
 .catch(err => console.error(err))
 this.setState({profile:
  {
    gmailAccount:this.state.profile.gmailAccount,
    prohibitions:prohibitions,
    imageUrl:imageUrl,
    userName:userName
  }
})


}
save() {
  this.setDataInDB()
  this.setState({editing:false})

}
handleProhabition(input){
  this.prohibitions = input.target.value

}
handleUserName(input){
  this.userName = input.target.value
}
handleImageUrl(input){
  this.imageUrl = input.target.value
}
renderForm(){
  return (
    <div>
    <div key={`profile`}>
    <img alt="" className="profileImg" src={this.state.profile.imageUrl}></img>
    <h2 className="profileName">{this.state.profile.userName}</h2>
    <h3 className="profileDetails">{this.state.profile.gmailAccount}</h3>
    <h4 className="profileDetails">Prohabitions: {this.state.profile.prohibitions}</h4>
    </div>
    <div className="profileForm">
            <span>First name
              <Form.Control
                  onChange={this.handleUserName}
                  type="text"
                  placeholder="First name"
              />
              </span>
              <span>Prohebition
              <Form.Control
                  onChange={this.handleProhabition}
                  type="text"
                  placeholder="Prohebition"
              />
              </span> 
              <span>Image url
              <Form.Control
                  onChange={this.handleImageUrl}
                  type="text"
                  placeholder="Image url"
              />
              </span> 
              <Button type="submit" onClick={this.save}>Save</Button>
    </div>
    </div>
)
}
renderUI(){
  return(
    <div>
      <div key={`profile`}>
      <img alt="" className="profileImg" src={this.state.profile.imageUrl}></img>
      <h2 className="profileName">{this.state.profile.userName}</h2>
      <h3 className="profileDetails">{this.state.profile.gmailAccount}</h3>
      <h4 className="profileDetails">Prohabitions: {this.state.profile.prohibitions}</h4>
      <MdEdit className="editIcon" onClick={this.edit}/>
      </div>
    </div> 
   )
}
  render() {
    return this.state.editing ? this.renderForm() : this.renderUI()

  }
}

export default Profile;
