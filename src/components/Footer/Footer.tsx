import Container from '@/components/Container';

const Footer = () => {
  return (
    <footer className="mt-20">
      <Container className="p-6">
        <p className="text-center text-zinc-500">
          Built with <a className="underline font-medium text-inherit" href="https://cloudinary.com/">Cloudinary</a> &amp; <a className="underline font-medium text-inherit" href="https://nextjs.org/">Next.js</a> by <a className="underline font-medium text-inherit" href="https://www.linkedin.com/in/nitika-padmakar-862665258">Nitika Padmakar</a>
        </p>
      </Container>
    </footer>
  );
}

export default Footer;
