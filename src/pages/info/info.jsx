import React, { Component } from 'react';
import './info.css';

export default class Info extends Component {
    render() {
        return (
            <div class="container">

            <div class="info-card-container">

                <div class="info-card">

                    <div class="info-card__image-exposure info-card__content">
                        <div class="info-card__image-exposure--blend">
                        </div>
                        <div class="info-card__image-exposure__item">
                        </div>

                    </div>

                    <div class="info-card__bio info-card__content">
                        <h2 class="info-card__bio--title">John Legend</h2>

                        <p class="info-card__bio--copy">John Roger Stephens (born December 28, 1978), better
                            known by his stage name John Legend, is an American
                            singer, songwriter and actor. He has won ten Grammy
                            Awards, one Golden Globe, and one Academy Award. In
                            2007, Legend received the Hal David Starlight Award
                            from the Songwriters Hall of Fame.</p>

                        <p class="info-card__bio--copy">Prior to the release of Legend's debut album, his
                            career gained momentum through a series of
                            successful collaborations with multiple established
                            artists. He sang in Magnetic Man's "Getting Nowhere,"
                            Kanye West's "All of the Lights", on Slum Village's
                            "Selfish", and Dilated Peoples' "This Way". Other
                            artists included Jay Z's "Encore", and he sang
                            backing vocals on Alicia Keys' 2003 song "You Don't
                            Know My Name", the Kanye West remix of Britney
                            Spears' "Me Against the Music", and Fort Minor's
                            "High Road". Legend played piano on Lauryn Hill's
                            "Everything Is Everything".</p>

                    </div>

                    <span class="close"></span>
                </div>
            </div>

        </div>
        );
    }
}