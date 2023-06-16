import { motion } from 'framer-motion';
import { Github, Globe, Linkedin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface MemberCardProps {
  name: string;
  linkedinLink: string;
  githubLink: string;
  text: string;
  image: string;
  website: string;
}

const MemberCard = ({ name, linkedinLink, githubLink, text, image, website }: MemberCardProps) => {
  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };
  return (
    <motion.div
      variants={item}
      className='group relative flex w-full flex-col items-center gap-4  rounded-lg border border-b-4 border-r-4 border-primary bg-[#e8f6fa] p-4 md:w-1/2'
    >
      <div className='absolute -left-8 -top-8 -z-10 h-32 w-32 rounded-tl-full border-l-4 border-t-4 border-primary transition-all duration-500 group-hover:scale-[2] group-hover:opacity-0' />
      <div className='absolute -bottom-8 -right-8 -z-10 h-32 w-32 rounded-br-full border-b-4 border-r-4 border-primary duration-500 group-hover:scale-[2] group-hover:opacity-0' />
      <Image
        className='aspect-square rounded-full object-cover'
        src={image}
        width={200}
        height={100}
        alt={name}
      />
      <h4 className='text-xl font-semibold'>{name}</h4>
      <div className='flex items-center gap-4'>
        <Link
          href={githubLink}
          target='_blank'
          className='hover:animate-pulse hover:text-[#19A7CE]'
        >
          <Github className='h-4 w-4' />
        </Link>
        <Link
          href={linkedinLink}
          target='_blank'
          className='hover:animate-pulse hover:text-[#19A7CE]'
        >
          <Linkedin className='h-4 w-4' />
        </Link>

        <Link href={website} target='_blank' className='hover:animate-pulse hover:text-[#19A7CE]'>
          <Globe className='h-4 w-4' />
        </Link>
      </div>
      <p className='text-center text-muted-foreground'>
        <span className='mr-1 text-2xl'>❝</span>
        {text}
        <span className='ml-1 text-2xl'>❞</span>
      </p>
    </motion.div>
  );
};

export default MemberCard;
