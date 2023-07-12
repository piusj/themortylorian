'use client';

import { Box, Center, Text } from '@chakra-ui/react';
import { User } from '@prisma/client';
import { Maybe } from '@/types/graphql';

export default function GameIntro({ user }: { user: Maybe<User> }) {
  if (!user) return null;

  return (
    <Center>
      <Box>
        <Text fontSize="md">
          Rick: Good. You Fiiinally logged in. Okay, here&apos;s the deal... MoooOOoorty is bailing
          on me because he wants to go to college. Not because he wants to learn anything, but
          because he thinks that&apos;s where he&apos;ll find girls. Yeah, I know.. pathetic!
          <br />
          <br />
          Rick: Anyway, I need you to do me a solid. I&apos;ve detected a huge increase in spy
          activity everywhere I go. These bastards at the New Council of Ricks have hired people
          from all over the universe in EVERY multiverse, just to keep tabs on me. Can you believe
          it! Thousands of spies all over the multiverse because of ME! I&apos;m too Rick for all
          the Rick&apos;s to fathom. They&apos;re jealous of me Morty! I mean.. {user.username}.
          They&apos;re jealous of me {user.username}!
          <br />
          <br />
          Rick: I need you to clean them up. You&apos;re a bounty hunter right? This is your
          purpose! This is the waaaay.
          <br />
          <br />
          Rick: These spies are really easy to spot because most of them are dumb as hell. All they
          are doing is using IDs that these Ricks have randomly stolen and modified from all over
          the multiverse. The will have the name and details of the victims they have stolen, but
          the picture is fake. It&apos;s their own picture lasered on top. I also suspect
          they&apos;ve hired people that I&apos;ve encountered in the past. So if you watch my show
          on multiversal TV, they should be much easier to spot.
          <br />
          <br />
          Rick: I&apos;ve created a device that has detected spies in a group of people, so I can
          narrow down the people I send to you in groups of 4. Each group of ID cards I send you
          will be sure to have 1 spy in it, so all you gotta do is look at their ID cards, detect
          which one is fake, and well, you can get creative.
          <br />
          <br />
          Rick: Happy hunting
        </Text>
      </Box>
    </Center>
  );
}
