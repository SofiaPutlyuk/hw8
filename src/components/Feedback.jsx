import React from "react";
import Statistics from "./Statistics";
import Section from "./Section";
import FeedbackOption from "./FeedbackOptions";
import Notification from "./Notification";
class Feedback extends React.Component {
    state = {
        good: 0,
        neutral: 0,
        bad: 0
    }
    onCountGood = () => {
        this.setState((prevState) => ({
            good: prevState.good + 1
        }))
    }
    onCountNeutral = () => {
        this.setState((prevState) => ({
            neutral: prevState.neutral + 1
        }))
    }
    onCountBad = () => {
        this.setState((prevState) => ({
            bad: prevState.bad + 1
        }))
    }
    onCountFeedback = (type) => {
        this.setState((prevState) => ({
            [type]: prevState[type] + 1
        }));
    };
    countTotalFeedback = () => {
        const good = this.state.good;
        const neutral = this.state.neutral;
        const bad = this.state.bad;
        return good + neutral + bad;
    }
    countPositiveFeedbackPercentage = () => {
        const good = this.state.good;
        const total = this.countTotalFeedback()
        if (total === 0) {
            return 0;
        }
        return Math.round((good / total) * 100)
    }
    render() {
        const totalFeedback = this.countTotalFeedback();
        return (
            <div>
                <Section title="Please leave feedback">
                    <FeedbackOption
                        options={['good', 'neutral', 'bad']}
                        onLeaveFeedback={this.onCountFeedback}
                    />
                </Section>
                {totalFeedback === 0 ? (
                    <Notification message="There is no feedback" />
                ) : (
                    <Section title="Statistics">
                        <Statistics
                            good={this.state.good}
                            neutral={this.state.neutral}
                            bad={this.state.bad}
                            total={totalFeedback}
                            positivePercentage={this.countPositiveFeedbackPercentage}
                        />
                    </Section>
                )}
            </div>
        );
    }
}
export default Feedback;