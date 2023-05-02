package com.example.backend.config;

import com.example.backend.entity.Role;
import com.example.backend.entity.TicketOffer;
import com.example.backend.entity.TicketType;
import com.example.backend.entity.User;
import com.example.backend.repository.TicketOfferRepository;
import com.example.backend.service.UserService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;
import java.util.stream.Stream;

@Configuration
@RequiredArgsConstructor
public class AppConfig implements CommandLineRunner {

    private final UserService userService;
    private final TicketOfferRepository ticketOfferRepository;
    @Bean
    public UserDetailsService userDetailsService(){
        return username -> userService.getUserByUsername(username)
                .orElseThrow(() -> new EntityNotFoundException("User not found"));
    }

    @Bean
    public AuthenticationProvider authenticationProvider(){
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider();
        authenticationProvider.setUserDetailsService(userDetailsService());
        authenticationProvider.setPasswordEncoder(passEncode());
        return authenticationProvider;
    }

    @Bean
    public BCryptPasswordEncoder passEncode() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }


    @Override
    public void run(String... args) {
        User user = User.builder()
                .password(passEncode().encode("test"))
                .username("conductor")
                .role(Role.CONDUCTOR)
                .build();
        userService.save(user);

        List<TicketOffer> offerList = List.of(
                TicketOffer.builder().ticketType(TicketType.RIDE_TICKET).price(5D).build(),
                TicketOffer.builder().ticketType(TicketType.SEASON_TICKET).validityPeriod(30L).price(40D).build(),
                TicketOffer.builder().ticketType(TicketType.SEASON_TICKET).validityPeriod(90L).price(100D).build(),
                TicketOffer.builder().ticketType(TicketType.SEASON_TICKET).validityPeriod(180L).price(180D).build(),
                TicketOffer.builder().ticketType(TicketType.TIME_TICKET).validityPeriod(15L).price(3.5D).build(),
                TicketOffer.builder().ticketType(TicketType.TIME_TICKET).validityPeriod(30L).price(6D).build(),
                TicketOffer.builder().ticketType(TicketType.TIME_TICKET).validityPeriod(60L).price(10D).build()
        );
        Stream<TicketOffer> discountedOfferStream = offerList.stream().map(this::makeDiscountedTicketOffer);
        List<TicketOffer> allOffersList = Stream.concat(offerList.stream(), discountedOfferStream).toList();
        ticketOfferRepository.saveAll(allOffersList);
    }

    private TicketOffer makeDiscountedTicketOffer(TicketOffer ticketOffer){
        return TicketOffer.builder()
                .isDiscounted(true)
                .validityPeriod(ticketOffer.getValidityPeriod())
                .ticketType(ticketOffer.getTicketType())
                .price(ticketOffer.getPrice() / 2)
                .build();
    }
}
