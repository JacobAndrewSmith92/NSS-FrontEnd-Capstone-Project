import React, { Component } from 'react';
import { Message, MessageHeader, MessageBody, Field, Label, Control, TextArea } from 'bloomer';


export default class Quizzes extends Component {


    render() {
        return (
            <div>
            <Message>
                    <MessageHeader>
                        <p>{this.props.questionNum}. {this.props.question}</p>
                    </MessageHeader>
                    <MessageBody>
                        <Field>
                            <Control>
                                <TextArea placeholder={'Your Answer'} />
                            </Control>
                        </Field>

                    </MessageBody>
                </Message>
            </div>
        )
    }

}