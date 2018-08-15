import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import  Home  from './Home'
import * as actions from '../actions/questions'

class NewQuestion extends Component {

    state = {
        optionOne: '',
        optionTwo: '',
    }

    generateId = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    }
    
    submitClick = () => {

        if (this.state.optionOne === '' || this.state.optionTwo === '') {
            return
        }

        let questionId = this.generateId()
        let timestamp = Date.now()

            const newQuestion = {
                [questionId]: {
                    id: questionId,
                    author: this.props.authedUser,
                    timestamp: timestamp,
                    optionOne: {
                      votes: [],
                      text: this.state.optionOne,
                    },
                    optionTwo: {
                      votes: [],
                      text: this.state.optionTwo,
                    }
                  },
            }

        this.props.addQuestion(newQuestion)
    }

    render () {

        if (this.props.authedUser === "") {
            return <Redirect to='/' exact component={Home} />
        }

      
          

        
        return (
            <div>
                <h3 className = 'center'> Enter Your Question</h3>
                <div className='new-question-box'>
                    <div className='new-option1'>
                        <p>Option 1</p>
                        <input type='text' onChange={(e) => {this.setState({optionOne: e.target.value})}} />
                    </div>
                    <div className='new-option2'>
                        <p>Option 2</p>
                        <input type='text' onChange={(e) => {this.setState({optionTwo: e.target.value})}}/>
                    </div>
                </div>
                <button className='submit-button' type='submit' onClick={() => {this.submitClick()}}>
                    Submit
                </button>
            </div>
        )
    }
}


function mapStateToProps ({ authedUser, questions }) {
    return {
        authedUser,
        questions,
    }
}
export default connect(mapStateToProps, actions)(NewQuestion)