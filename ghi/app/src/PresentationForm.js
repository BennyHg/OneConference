import React from 'react';

class PresentationForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            presenterName: '',
            presenterEmail: '',
            companyName: '',
            title: '',
            synopsis: '',
            conferences: []
        }
        this.handlePresenterNameChange = this.handlePresenterNameChange.bind(this)
        this.handlePresenterEmailChange = this.handlePresenterEmailChange.bind(this)
        this.handleCompanyNameChange = this.handleCompanyNameChange.bind(this)
        this.handleTitleChange = this.handleTitleChange.bind(this)
        this.handleSynopsisChange = this.handleSynopsisChange.bind(this)
        this.handleConferenceChange = this.handleConferenceChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state}
        data.presenter_name = data.presenterName
        data.presenter_email = data.presenterEmail
        data.company_name = data.companyName
        delete data.presenterName
        delete data.presenterEmail
        delete data.companyName
        delete data.conferences

        let conferenceId = data.conference
        console.log(conferenceId)
        const presentationUrl = `http://localhost:8000/api/conferences/${conferenceId}/presentations/`
        console.log(presentationUrl)
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        let response = await fetch(presentationUrl, fetchConfig);
        if (response.ok) {
            const newPresentation = await response.json()
            console.log(newPresentation)

            const cleared = {
                presenterName: '',
                presenterEmail: '',
                companyName: '',
                title: '',
                synopsis: '',
                conferences: ''
            };
            this.setState(cleared)
        }
    }

    handlePresenterNameChange(event) {
        const value = event.target.value
        this.setState({presenterName: value})
    }

    handlePresenterEmailChange(event) {
        const value = event.target.value
        this.setState({presenterEmail: value})
    }

    handleCompanyNameChange(event) {
        const value = event.target.value
        this.setState({companyName: value})
    }

    handleTitleChange(event) {
        const value = event.target.value
        this.setState({title: value})
    }

    handleSynopsisChange(event) {
        const value = event.target.value
        this.setState({synopsis: value})
    }

    handleConferenceChange(event) {
        const value = event.target.value
        this.setState({conference: value})
    }
    
    async componentDidMount() {
        const url = 'http://localhost:8000/api/conferences/';

        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            this.setState({conferences: data.conferences});
        }
    }

    render() {
        return (
            <div className="row">
            <div className="offset-3 col-6">
              <div className="shadow p-4 mt-4">
                <h1>Create a new presentation</h1>
                <form onSubmit={this.handleSubmit} id="create-presentation-form">
                  <div className="form-floating mb-3">
                    <input value={this.state.presenterName} onChange={this.handlePresenterNameChange} placeholder="Presenter name" required type="text" name="presenter_name" id="presenter_name" className="form-control"/>
                    <label htmlFor="presenter_name">Presenter name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input value={this.state.presenterEmail} onChange={this.handlePresenterEmailChange} placeholder="Presenter email" required type="text" name="presenter_email" id="presenter_email" className="form-control"/>
                    <label htmlFor="presenter_email">Presenter email</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input value={this.state.companyName} onChange={this.handleCompanyNameChange} placeholder="Company name" required type="text" name="company_name" id="company_name" className="form-control"/>
                    <label htmlFor="company_name">Company name</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input value={this.state.title} onChange={this.handleTitleChange} placeholder="Title" required type="text" name="title" id="title" className="form-control"/>
                    <label htmlFor="title">Title</label>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="synopsis">Synopsis</label>
                    <textarea value={this.state.synopsis} onChange={this.handleSynopsisChange} required type="textarea" name="synopsis" id="synopsis" className="form-control"></textarea>
                  </div>  
                  <div className="mb-3">
                    <select value={this.state.conference} onChange={this.handleConferenceChange} required id="conference" className="form-select" name="conference">
                      <option value="">Choose a conference</option>
                      {this.state.conferences ? this.state.conferences.map(conference => {
                        return (
                            <option key={conference.id} value={conference.id}>
                                {conference.name}
                            </option>
                        )
                    }) : null }
                    </select>
                  </div> 
                  <button className="btn btn-primary">Create</button>
                </form>
              </div>
            </div>
          </div>
        );
    }
}

export default PresentationForm