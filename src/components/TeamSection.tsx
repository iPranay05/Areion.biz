'use client';
import Image from 'next/image';

const TeamSection = () => {
  return (
    <section id="team" className="container flex-center flex-column">
      <h5 className="section-subheading text-center">
        our team
      </h5>
      <h2 className="section-heading text-center">Meet our expert team</h2>

      <div className="team">
        <div className="team__member">
          <div className="team__member-img">
            <Image src="/assets/img/pranayex.png" alt="Team Member" width={300} height={300} />
          </div>
          <div className="team__member-details">
            <h3 className="team__member-name">Pranay Nair</h3>
            <p className="team__member-role">COO & Co-founder</p>
            <div className="team__member-socials">
             
            </div>
          </div>
        </div>

        <div className="team__member">
          <div className="team__member-img">
            <Image src="/assets/img/aadityawebs.png" alt="Team Member" width={300} height={300} />
          </div>
          <div className="team__member-details">
            <h3 className="team__member-name">Aaditya Dubey</h3>
            <p className="team__member-role">CEO & Co-founder</p>
            <div className="team__member-socials">
             
            </div>
          </div>
        </div>

        {/* <div className="team__member">
          <div className="team__member-img">
            <Image src="/assets/img/niddhiwebs.png" alt="Team Member" width={300} height={300} />
          </div>
          <div className="team__member-details">
            <h3 className="team__member-name">Niddhi Tripathi</h3>
            <p className="team__member-role">UI/UX Lead</p>
            <div className="team__member-socials">
              
            </div>
          </div>
        </div> */}

    
      </div>
    </section>
  );
};

export default TeamSection;
